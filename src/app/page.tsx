"use client";
import {
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  createInitializeMint2Instruction,
  getMinimumBalanceForRentExemptMint,
} from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";

export default function Home() {
  const { connection } = useConnection();
  const wallet = useWallet();

  const createToken = async () => {
    const mintKeyPair = Keypair.generate();
    const lamports = await getMinimumBalanceForRentExemptMint(connection);

    const transaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: mintKeyPair.publicKey,
        space: MINT_SIZE,
        lamports,
        programId: TOKEN_PROGRAM_ID,
      }),
      createInitializeMint2Instruction(
        mintKeyPair.publicKey,
        9,
        wallet.publicKey,
        wallet.publicKey,
        TOKEN_PROGRAM_ID
      )
    );

    transaction.feePayer = wallet.publicKey;
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;
    transaction.partialSign(mintKeyPair);

    await wallet.sendTransaction(transaction, connection);
    console.log(`Token mint created at ${mintKeyPair.publicKey.toBase58()}`);
  };

  return (
    <div className="h-full w-full m-auto p-10 bg-slate-900 flex justify-center items-center flex-col gap-4 text-2xl">
      <h1 className="text-6xl font-bold text-slate-50 m-5">
        SOLANA Token Launchpad
      </h1>
      <input
        type="text"
        placeholder="Name"
        className="border border-white/50 px-2 py-1 rounded"
      />
      <input
        type="text"
        placeholder="Symbol"
        className="border border-white/50 px-2 py-1 rounded"
      />
      <input
        type="text"
        placeholder="Image URL"
        className="border border-white/50 px-2 py-1 rounded"
      />
      <input
        type="text"
        placeholder="Initial Supply"
        className="border border-white/50 px-2 py-1 rounded"
      />
      <button onClick={createToken} className="bg-slate-600 py-2 px-4 rounded ">
        Create token
      </button>
    </div>
  );
}
