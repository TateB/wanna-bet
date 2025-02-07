"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { type InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import {
  type FormattedBet,
  type FormattedBets,
  getRecentFormattedBets,
  getUserFormattedBets,
} from "@/services/services";
import { LoadingSpinner } from "./ui/spinner";
import { useAccount } from "wagmi";
import { CustomConnectButtonSecondary } from "./rainbow/custom-connect-button";
import React from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";

export function BetListCard({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <Card className="h-fit w-full">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center pt-4">{children}</CardContent>
    </Card>
  );
}

export function RecentBetList({
  currentView,
  setBetFn,
}: {
  currentView: FormattedBet | "create" | undefined;
  setBetFn: (bet: FormattedBet) => void;
}) {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["recentBetData"],
    queryFn: ({ pageParam = "" }) =>
      getRecentFormattedBets(6, { afterCursor: pageParam }),
    initialPageParam: "",
    getNextPageParam: (lastPage, _) => lastPage.pageInfo?.endCursor,
    maxPages: 7,
  });
  return status === "pending" ? (
    <LoadingSpinner />
  ) : status === "error" ? (
    "An error has occurred: " + { error }
  ) : (
    <BetList
      data={data}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      isFetching={isFetching}
      fetchNextPage={fetchNextPage}
      currentView={currentView}
      setBetFn={setBetFn}
    />
  );
}

export function MyBetList({
  currentView,
  setBetFn,
}: {
  currentView: FormattedBet | "create" | undefined;
  setBetFn: (bet: FormattedBet) => void;
}) {
  const account = useAccount();
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["myBetData"],
    queryFn: ({ pageParam = "" }) =>
      getUserFormattedBets(account.address!, 6, { afterCursor: pageParam }),
    initialPageParam: "",
    getNextPageParam: (lastPage, _) => lastPage.pageInfo?.endCursor,
    maxPages: 7,
    enabled: account.isConnected,
  });
  return account.isDisconnected ? (
    <CustomConnectButtonSecondary />
  ) : status === "pending" ? (
    <LoadingSpinner />
  ) : status === "error" ? (
    "An error has occurred: " + { error }
  ) : (
    <BetList
      data={data}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      isFetching={isFetching}
      fetchNextPage={fetchNextPage}
      currentView={currentView}
      setBetFn={setBetFn}
    />
  );
}

function BetList({
  data,
  hasNextPage,
  isFetchingNextPage,
  isFetching,
  fetchNextPage,
  currentView,
  setBetFn,
}: {
  data: InfiniteData<FormattedBets, unknown> | undefined;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isFetching: boolean;
  fetchNextPage: any;
  currentView: FormattedBet | "create" | undefined;
  setBetFn: (bet: FormattedBet) => void;
}) {
  return (
    <ScrollArea className="h-80 w-full pr-2">
      <Table>
        <TableHeader className="sticky top-0 bg-card">
          <TableRow>
            <TableHead className="text-center">bet</TableHead>
            <TableHead>amount</TableHead>
            <TableHead>participants</TableHead>
            <TableHead className="text-center">status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.pages.map((page, i) => (
            <>
              {page.items.map((bet, i) => (
                <TableRow
                  key={i}
                  onClick={() => setBetFn(bet)}
                  data-current-bet={
                    typeof currentView === "object" &&
                    bet.betId === currentView.betId
                  }
                  className="cursor-pointer data-[current-bet=true]:bg-muted"
                >
                  <TableCell className="text-center">{bet.betId}</TableCell>
                  <TableCell>{bet.amount} USDC</TableCell>
                  <TableCell>
                    {bet.creatorAlias}
                    <span className="text-muted-foreground"> vs </span>
                    {bet.participantAlias}
                  </TableCell>
                  <TableCell className="text-center">
                    {bet.status === "pending" ? (
                      <span>⌛️</span>
                    ) : bet.status === "accepted" ? (
                      <span className="text-green-700">✓</span>
                    ) : bet.status === "declined" ||
                      bet.status === "expired" ? (
                      <span className="text-lg leading-none text-red-700">
                        𐄂
                      </span>
                    ) : bet.status === "settled" ? (
                      <span>💰</span>
                    ) : (
                      "..."
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </>
          ))}
          <TableRow>
            <TableCell colSpan={4}>
              <div className="mx-auto w-fit">
                {isFetching && !isFetchingNextPage ? (
                  <LoadingSpinner />
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!hasNextPage || isFetchingNextPage}
                    onClick={() => fetchNextPage()}
                  >
                    {isFetchingNextPage
                      ? "Loading..."
                      : hasNextPage
                        ? "Load More"
                        : "Nothing more to load"}
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
