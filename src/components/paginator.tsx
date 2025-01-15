import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';

interface PaginatorProps {
  page: number;
  total: number;
  limit: number;
  onClickPage: (p: number) => void;
}

function Paginator({ page, total, limit, onClickPage }: PaginatorProps) {
  const maxPage = Math.floor(total / limit);
  console.log({
    page, total, limit, maxPage
  });
  return (
    <Pagination>
      <PaginationContent>
        {page > 0 ? (
          <>
            <PaginationItem>
              <PaginationPrevious onClick={() => onClickPage(page - 1)} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => onClickPage(page - 1)}>
                {page}
              </PaginationLink>
            </PaginationItem>
          </>
        ) : null}
        {page > 3 ? (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        ) : null}
        <PaginationItem>
          <PaginationLink href='#' isActive>
            {page + 1}
          </PaginationLink>
        </PaginationItem>
        {page < maxPage - 3 ? (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        ) : null}
        {page < maxPage ? (
          <>
            <PaginationItem>
              <PaginationLink onClick={() => onClickPage(page + 1)}>
                {page + 2}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext onClick={() => onClickPage(page + 1)} />
            </PaginationItem>
          </>
        ) : null}
      </PaginationContent>
    </Pagination>
  );
}

export default Paginator;
