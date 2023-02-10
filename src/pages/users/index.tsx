import { Header } from "@/src/components/Header";
import { Pagination } from "@/src/components/Pagination";
import { Sidebar } from "@/src/components/Sidebar";
import { api } from "@/src/services/api";
import { getUsers, useUsers } from "@/src/services/hooks/useUsers";
import { queryClient } from "@/src/services/queryClient";
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
  Link,
} from "@chakra-ui/react";
import { GetServerSideProps } from 'next';
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";

interface IUserProps {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export default function ListUsers({users}: any) {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, error } = useUsers(page, {
    initialData: users
  });

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

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(
      ["user", userId],
      async () => {
        const response = await api.get(`users/${userId}`);

        return response.data;
      },
      {
        staleTime: 1000 * 60 * 10,
      }
    );
  }

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
            <NextLink href="/users/create" passHref>
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
            </NextLink>
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
                  {data?.users.map((user: IUserProps) => {
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
                            <Link
                              color="purple.500"
                              onMouseEnter={() => handlePrefetchUser(user.id)}
                            >
                              <Text fontWeight="bold">{user.email}</Text>
                            </Link>
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
              <Pagination
                totalCountOfRegisters={200}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { users, totalCount } = await getUsers(1);

  return {
    props: {
      users,
    }
  }
}
