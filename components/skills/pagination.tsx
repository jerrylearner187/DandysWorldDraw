// components/skills/Pagination.tsx
'use client';

import { Button } from '@nextui-org/react';
import { Trans } from '@lingui/macro';
import { useState } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const [page, setPage] = useState(currentPage);
  return (
    <div className="mt-8 flex justify-center">
      <div className="flex space-x-2">
        <Button
          variant="bordered"
          disabled={page === 1}
          onPress={() => {setPage(page - 1); onPageChange(page)}}
        >
          <Trans>Previous</Trans>
        </Button>
        <div className="flex items-center px-4 bg-gray-800 rounded">
          <span>{page}</span>
          <span className="mx-2">/</span>
          <span>{totalPages}</span>
        </div>
        <Button
          variant="bordered"
          disabled={page === totalPages}
          onPress={() => {setPage(page + 1); onPageChange(page)}}
        >
          <Trans>Next</Trans>
        </Button>
      </div>
    </div>
  );
}
