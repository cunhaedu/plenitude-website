import { useEffect } from 'react';
import ReactPaginate from 'react-paginate';

type PaginatorProps = {
  itemsOffset: number;
  items: any[];
  currentItems: any[];
  setItemsOffset: (offset: number) => void;
  setCurrentItems: (items: any[]) => void;
}

export function Paginator({
  items,
  currentItems,
  setItemsOffset,
  itemsOffset,
  setCurrentItems
}: PaginatorProps) {
  const itemsPerPage = 10;
  const pageCount = Math.ceil(items.length / itemsPerPage);
  const endOffset = itemsOffset + 10;

  useEffect(() => {
    setCurrentItems(items.slice(itemsOffset, endOffset));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  function handlePageClick(selectedItem: { selected: number }): void {
    const newOffset = (selectedItem.selected * itemsPerPage) % items.length;
    setItemsOffset(newOffset);
  };

  return (
    <section className='flex items-center justify-center sm:justify-between border-t border-gray-200 bg-white pt-4'>
      <div className='hidden sm:block'>
        <p className="text-sm text-gray-700">
          Mostrando <span className="font-medium">{itemsOffset + 1}</span> à <span className="font-medium">{itemsOffset + currentItems.length}</span> de{' '}
          <span className="font-medium">{items.length}</span> resultados
        </p>
      </div>

      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        containerClassName="react-paginate"
        pageClassName="page-item"
        nextClassName="next-item"
        previousClassName="previous-item"
        activeClassName="active-item"
        disabledClassName="disabled-item"
      />
    </section>
  )
}
