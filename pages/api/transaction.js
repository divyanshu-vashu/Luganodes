const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");

const MORALIS_API_KEY = process.env.MORALIS_API_KEY;
const chain = EvmChain.ETHEREUM;

export default async function handler(req, res) {
  try {
    const {
      query: { hash },
    } = req;

    if (!Moralis.Core.isStarted) {
      Moralis.start({
        apiKey: MORALIS_API_KEY,
      });
    }

    const response = await Moralis.EvmApi.transaction.getTransaction({
      chain: chain._value,
      transactionHash: hash,
    });

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(400).json();
  }
}
