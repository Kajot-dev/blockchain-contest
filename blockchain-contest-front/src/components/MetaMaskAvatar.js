import jazzicon from "@metamask/jazzicon";
import { PulseLoader } from "react-spinners";
import { useState, useEffect, useTransition } from "react";

let cachedAvatars = {};

export default function MetaMaskAvatar({ address, size }) {
  const [avatar, setAvatar] = useState(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (cachedAvatars[address]) {
      setAvatar(cachedAvatars[address]);
    } else {
      startTransition(() => {
        const avatar = jazzicon(size, parseInt(address.slice(2, 10), 16));
        cachedAvatars[address] = avatar;
        setAvatar(avatar);
      });
    }
  }, [address, size]);

  if (!address) return null;

  return isPending ? (
    <PulseLoader color="var(--accent-color)" size={10} />
  ) : (
    avatar
  );
}
