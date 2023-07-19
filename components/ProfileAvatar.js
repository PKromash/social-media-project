import {chakra} from "@chakra-ui/react";
import {useRouter} from "next/navigation";

const ProfileAvatar = ({userId, image, size}) => {
  const ChakraImage = chakra("img");
  const router = useRouter();

  return (
    <ChakraImage
      src={image}
      referrerPolicy="no-referrer"
      alt="Profile"
      borderRadius="full"
      boxSize={size}
      css={{
        "&:hover": {
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
          cursor: "pointer",
        },
      }}
      onClick={() => router.push(`/profile?id=${userId}`)}
    />
  );
};

export default ProfileAvatar;
