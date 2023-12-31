const assert = require('assert');
const ganache = require('ganache');
const { Web3 } = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require("../compile");

let accounts;
let Lottery;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  Lottery = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
    })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Lottery Contract Test #1", () => {
  it("deploys a Lottery contract", () => {
   assert(Lottery.options.address)
  });
});
