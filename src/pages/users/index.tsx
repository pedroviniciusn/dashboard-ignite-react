import { Header } from "@/src/components/Header";
import { Pagination } from "@/src/components/Pagination";
import { Sidebar } from "@/src/components/Sidebar";
import { api } from "@/src/services/api";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { useQuery } from "react-query";

interface IUserProps {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export default function ListUsers() {
  const { data, isLoading, isFetching, error } = useQuery(
    "users",
    async () => {
      const { data } = await api.get("users");

      const users = data.users.map((user: IUserProps) => {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: new Date(user.createdAt).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }),
        };
      });

      return users;
    },
    {
      staleTime: 1000 * 5,
    }
  );

  const [isWideVersion, setIsWideVersion] = useState<boolean | undefined>(
    false
  );

  const isWideVersionChakra = useBreakpointValue({
    base: false,
    md: true,
  });

  useEffect(() => {
    setIsWideVersion(isWideVersionChakra);
  }, [isWideVersionChakra]);

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius="8" bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml={4} />
              )}
            </Heading>
            <Link href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                _hover={{
                  cursor: "pointer",
                }}
              >
                Criar novo
              </Button>
            </Link>
          </Flex>

          {isLoading ? (
            <Flex>
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex>
              <Text>Falha ao obter dados dos usuários.</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha" w={["100%"]}>
                <Thead>
                  {isWideVersion ? (
                    <Tr>
                      <Th px={["0", "0", "6"]} color="gray.300" width="8">
                        <Checkbox colorScheme="pink" />
                      </Th>
                      <Th>Usuário</Th>
                      <Th>Data de cadastro</Th>
                      <Th>Ações</Th>
                    </Tr>
                  ) : (
                    <Tr>
                      <Th
                        px={["0", "0", "6"]}
                        color="gray.300"
                        display="flex"
                        justifyContent="space-between"
                      >
                        <Text>Selecionar todos:</Text>
                        <Checkbox colorScheme="pink" />
                      </Th>
                    </Tr>
                  )}
                </Thead>
                <Tbody>
                  {data.map((user: IUserProps) => {
                    return (
                      <Tr
                        display={["block", "block", "table-row"]}
                        borderBottom={[
                          "2px dashed gray",
                          "2px dashed gray",
                          "none",
                        ]}
                        _last={{ borderBottom: "none" }}
                        key={user.id}
                      >
                        <Td
                          px={["0", "0", "6"]}
                          textAlign={["right", "right", "inherit"]}
                          justifyContent={[
                            "space-between",
                            "space-between",
                            "inherit",
                          ]}
                          display={["flex", "flex", "revert"]}
                          _before={{
                            display: "flex",
                            alignItems: "center",
                            textAlign: "left",
                            color: "gray.400",
                            content: `attr(data-label)`,
                          }}
                          data-label={!isWideVersion ? "Check:" : ""}
                        >
                          <Checkbox colorScheme="pink" />
                        </Td>
                        <Td
                          px={["0", "0", "6"]}
                          textAlign={["right", "right", "inherit"]}
                          justifyContent={[
                            "space-between",
                            "space-between",
                            "inherit",
                          ]}
                          display={["flex", "flex", "revert"]}
                          _before={{
                            display: "flex",
                            alignItems: "center",
                            textAlign: "left",
                            color: "gray.400",
                            content: `attr(data-label)`,
                          }}
                          data-label={!isWideVersion ? "Usuário:" : ""}
                        >
                          <Box>
                            <Text fontWeight="bold">{user.name}</Text>
                            <Text fontSize="sm" color="gray.300">
                              {user.email}
                            </Text>
                          </Box>
                        </Td>
                        <Td
                          px={["0", "0", "6"]}
                          textAlign={["right", "right", "inherit"]}
                          justifyContent={[
                            "space-between",
                            "space-between",
                            "inherit",
                          ]}
                          display={["flex", "flex", "revert"]}
                          _before={{
                            display: "flex",
                            alignItems: "center",
                            textAlign: "left",
                            color: "gray.400",
                            content: `attr(data-label)`,
                          }}
                          data-label={!isWideVersion ? "Data de Cadastro:" : ""}
                        >
                          {user.createdAt}
                        </Td>
                        <Td
                          px={["0", "0", "6"]}
                          textAlign={["right", "right", "inherit"]}
                          justifyContent={[
                            "space-between",
                            "space-between",
                            "inherit",
                          ]}
                          display={["flex", "flex", "revert"]}
                          _before={{
                            display: "flex",
                            alignItems: "center",
                            textAlign: "left",
                            color: "gray.400",
                            content: `attr(data-label)`,
                          }}
                          data-label={!isWideVersion ? "Ações:" : ""}
                        >
                          <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="purple"
                            leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                            _hover={{
                              cursor: "pointer",
                            }}
                          >
                            Editar
                          </Button>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
              <Pagination />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
