// "use client";
// import { useAccount, useDisconnect } from "wagmi";
// import { injected } from "wagmi/connectors";
// import { Button } from "../ui/button";
// import { MetamaskIcon } from "./MetamaskIcon";
// import { useSession } from "next-auth/react";
// import { toast } from "@/hooks/use-toast";
// import { connect, getAccount } from "@wagmi/core";
// import { config } from "@/lib/wagmi/config";

// const MetamaskLoginButton = ({
//   setOpen,
// }: {
//   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }) => {

//   const { isConnected } = useAccount();

//   const authenticateWithMetaMask = async (
//     event: React.MouseEvent<HTMLButtonElement>,
//   ) => {
//     event.preventDefault();

//     if (!isConnected) {
//       try {
//         await connect(config, {
//           connector: injected(),
//         });
//       } catch (error) {
//         toast({
//           title: "Error",
//           description: "Could not connect to Metamask",
//         });
//       }
//     }
//   };

//   return (
//     <>
//       <Button
//         variant="outline"
//         className="w-full"
//         onClick={async (e) => {
//           await authenticateWithMetaMask(e);
//         }}
//         size={"sm"}
//       >
//         <MetamaskIcon className="mr-2" />
//         Metamask
//       </Button>
//     </>
//   );
// };

// export default MetamaskLoginButton;
