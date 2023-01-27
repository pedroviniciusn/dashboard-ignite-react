import { Flex, Avatar, Text, Box } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Pedro Vinícius</Text>
          <Text color="gray.300" fontSize="small">
            pedrovinicius.dev@gmail.com
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Pedro Vinicius"
        src="https://github.com/pedroviniciusn.png"
      />
    </Flex>
  );
}
