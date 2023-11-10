import Input from "@/components/input";
import ItemLabel from "@/components/item-label";
import { MotionBox } from "@/components/motion-elements";
import TextSwitchSpaced from "@/components/text-switch-spaced";
import GalleryIcon from "@/icons/gallery";
import { Box, Flex, Grid, GridItem, HStack, Image, Spacer, Square, Text } from "@chakra-ui/react";
import AttributeRow from "./attribute-row";
import Button from "@/components/button";
import PlusMinus from "@/features/terminal/components/plus-minus";
import { NFTStorage, File } from "nft.storage";
import TextArea from "@/components/text-area";
import { useEffect, useRef, useState } from "react";
import { IAttribute } from "../../types";
import { useMintNftMutation } from "@/features/shared/redux/xrp.api";
import { useSelector } from "react-redux";
import { selectAddress } from "@/features/wallet/redux/wallet.selectors";
import useSubmitTxn from "@/features/shared/hooks/use-submit-txn";
import usePlusMinus from "../../hooks/use-plus-minus";
import ResponseModal from "@/components/response-modal";
import Backdrop from "@/components/backdrop";
import { TTxnPipeline } from "@/features/shared/types";
import MyrkleLoader from "@/components/myrkle-loader";
import { numbersOnlyRegex } from "@/constants";
import XummTxnModal from "@/components/xumm-txn-modal";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGExMkQwYTNjODkxMmVGYTE0OTgyZjRkOUZlYzMwOEUzMjE3NEUzNTAiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5NDg4OTM2NDU2MCwibmFtZSI6Ik15cmtsZSJ9.dSxW_AFZ9qxOQOwUptBox5ovzH4ACFqLuraaAhOekRU";

function MintNftForm() {
  const [{ isSubmitTxnSuccess, xummTxnQrCode }, { handleSubmitTxn, resetSubmitTxnResponse }] =
    useSubmitTxn();

  const [percentage, { handlePlusClick, handleMinusClick, handleInputChange }] = usePlusMinus({
    min: 0,
    max: 100,
  });

  // =============================================================================================
  // selectors
  // =============================================================================================

  const address = useSelector(selectAddress);

  // =============================================================================================
  // state & ref
  // =============================================================================================

  const [imagePreview, setImagePreview] = useState<any>("");
  const [imageData, setImageData] = useState<any>("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [taxon, setTaxon] = useState("");
  const [isTransferable, setIsTransferable] = useState(false);
  const [issuerBurn, setIssuerBurn] = useState(false);
  const [onlyXrp, setOnlyXrp] = useState(false);
  const [attributes, setAttributes] = useState<IAttribute[]>([{ trait_type: "", value: "" }]);
  const [view, setView] = useState<TTxnPipeline>("default");

  const fileRef = useRef<any>();

  // =============================================================================================
  // api
  // =============================================================================================

  const [mintNft] = useMintNftMutation();

  // =============================================================================================
  // effects
  // =============================================================================================

  useEffect(() => {
    if (xummTxnQrCode) {
      setView("xumm-qr-code");
    }
  }, [xummTxnQrCode]);

  useEffect(() => {
    if (isSubmitTxnSuccess === null) return;

    if (isSubmitTxnSuccess) {
      setView("success");
    } else setView("error-2");
  }, [isSubmitTxnSuccess]);

  // =============================================================================================
  // handle change & plusIcon click
  // =============================================================================================

  const handleFileChange = (e: any) => {
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setImageData(e.target.files[0]);
  };

  const handleAttributeChange = (e: any, i: number, attr: keyof IAttribute) => {
    const value = [...attributes];
    value[i][attr] = e.target.value;
    setAttributes(value);
  };

  const handlePlusIconClick = (i: number) => {
    const value = [...attributes];
    value.splice(i + 1, 0, { trait_type: "", value: "" });
    setAttributes(value);
  };

  // =============================================================================================
  // other handlers
  // =============================================================================================

  const uploadNft = async (name: string, description: string, image: any, attributes: any[]) => {
    try {
      const client = new NFTStorage({
        token: TOKEN,
      });
      const imageFile = new File([image], name);
      const meta = await client.store({
        schema: "ipfs://bafkreidtjf2ihiwtptiyadjfmesplo555iy2jdcwhfr6hkenr2z3fvxn2y",
        nftType: "art.v0",
        name,
        description,
        image: imageFile,
        animation: "",
        audio: "",
        video: "",
        "3d_model": "",
        collection: {},
        attributes,
      });
      return meta.url;
    } catch (err) {
      console.log(err);
      setView("error-1");
    }
  };

  const handleConfirmClick = async () => {
    setView("loading");

    uploadNft(name, description, imageData, attributes).then((uri: any) => {
      // mint nft
      mintNft({
        issuer_addr: address,
        taxon,
        is_transferable: isTransferable,
        issuer_burn: issuerBurn,
        only_xrp: onlyXrp,
        transfer_fee: String(percentage),
        uri,
      })
        .unwrap()
        .then((res) => {
          handleSubmitTxn(res);
        })
        .catch(() => setView("error-1"));
    });
  };

  const handleReset = () => {
    setView("default");
    resetSubmitTxnResponse();
  };

  return (
    <>
      <Box pr={2} pb="150px" pos="relative">
        <ItemLabel title="NFT name" />
        <Flex gap="10px" mb={5}>
          <Input w="100%" value={name} onChange={(e: any) => setName(e.target.value)} />
          <input
            type="file"
            ref={fileRef}
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          {!imagePreview && (
            <Square
              size="40px"
              bg="secondary"
              borderRadius="5px"
              cursor="pointer"
              onClick={() => fileRef.current.click()}
            >
              <GalleryIcon />
            </Square>
          )}
        </Flex>

        {imagePreview && (
          <Flex mb={3} gap={3}>
            <Flex
              w="50%"
              justify="center"
              align="center"
              aspectRatio={1.1}
              p={2}
              borderRadius="5px"
              bg="darkest"
            >
              <Image src={imagePreview} alt="" objectFit="contain" maxH="100%" maxW="100%" />
            </Flex>
            <Flex
              w="50%"
              justify="center"
              align="center"
              bg="secondary"
              borderRadius="5px"
              cursor="pointer"
              aspectRatio={1.1}
              onClick={() => fileRef.current.click()}
            >
              <GalleryIcon fontSize="50px" />
            </Flex>
          </Flex>
        )}

        <ItemLabel title="Description" />
        <TextArea
          mb={5}
          value={description}
          onChange={(e: any) => setDescription(e.target.value)}
        />

        <MotionBox pos="relative" h="65px" mb={10}>
          <Box pos="absolute" bottom={0} w="100%">
            <ItemLabel title="Taxon" />
            <Input
              w="100%"
              value={taxon}
              onChange={(e: any) =>
                e.target.value.match(numbersOnlyRegex) && setTaxon(e.target.value)
              }
            />
          </Box>
        </MotionBox>

        <TextSwitchSpaced
          isChecked={isTransferable}
          handleChange={() => setIsTransferable(!isTransferable)}
          title="Transferrable"
        />
        <TextSwitchSpaced
          isChecked={onlyXrp}
          handleChange={() => setOnlyXrp(!onlyXrp)}
          title="Only XRP"
        />
        <TextSwitchSpaced
          isChecked={issuerBurn}
          handleChange={() => setIssuerBurn(!issuerBurn)}
          title="Issuer burn"
        />

        <Box bg="darkest" borderRadius="20px" px={3} py={1} mb={2}>
          <ItemLabel title="Attributes" mb={0} />
        </Box>
        <Grid templateColumns="repeat(12, 1fr)" gap={2}>
          <GridItem colSpan={4}>
            <ItemLabel title="Trait" mb={0} />
          </GridItem>
          <GridItem colSpan={6}>
            <ItemLabel title="Value" mb={0} />
          </GridItem>
          <GridItem colSpan={2} />
          {attributes.map(({ trait_type, value }, i: number) => (
            <AttributeRow
              key={i}
              traitType={trait_type}
              traitValue={value}
              handleTraitTypeChange={(e) => handleAttributeChange(e, i, "trait_type")}
              handleTraitValueChange={(e) => handleAttributeChange(e, i, "value")}
              handlePlusIconClick={() => handlePlusIconClick(i)}
            />
          ))}
        </Grid>

        <Box pos="absolute" bottom="0" w="calc(100% - 7px)" bg="darkest" borderRadius="20px" p={3}>
          <HStack mb={5}>
            <ItemLabel title="Royalties" mb={0} />
            <Spacer />
            <PlusMinus
              value={percentage}
              maxValue={100}
              isDisabled={!isTransferable}
              handlePlusClick={handlePlusClick}
              handleMinusClick={handleMinusClick}
              handleInputChange={handleInputChange}
            />
            <Text fontSize="sm" fontWeight="bold">
              %
            </Text>
          </HStack>
          <Button w="100%" onClick={handleConfirmClick}>
            confirm
          </Button>
        </Box>
      </Box>

      <Backdrop isOpen={view !== "default"}>
        {view === "loading" && <MyrkleLoader />}
        {view === "error-1" && <ResponseModal isError={true} handleClose={handleReset} />}
        {view === "xumm-qr-code" && <XummTxnModal qrCodeImage={xummTxnQrCode} />}
        {view === "error-2" && <ResponseModal isError={true} handleClose={handleReset} />}
        {view === "success" && <ResponseModal isError={false} handleClose={handleReset} />}
      </Backdrop>
    </>
  );
}

export default MintNftForm;
