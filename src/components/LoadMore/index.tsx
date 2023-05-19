import React from "react";

interface LoadMoreProps<T> {
  initialData: T[];
  onReceivedData?: (data: T[]) => void;
  customLoadMore?: () => void;
  render: (
    values: T[],
    handleScroll: (event: React.UIEvent<HTMLElement>) => void
  ) => React.ReactElement | null;
}

interface ArrayProps<T> extends LoadMoreProps<T> { }
type TScroll = "Firebase" | "Array";

type TProps<T> = {
  typeScroll: TScroll;
} & (ArrayProps<T>);

function LoadMore<T>(props: TProps<T>): React.ReactElement | null {


  const arrayProps = props as ArrayProps<T>;
  const { initialData, render } = arrayProps;
  const [visibleItems, setVisibleItems] = React.useState<T[]>(
    initialData.slice(0, 10)
  );

  const handleLoadMore = () => {
    setVisibleItems((prevVisibleItems) => {
      const nextIndex = prevVisibleItems.length + 10;
      return [
        ...prevVisibleItems,
        ...initialData.slice(prevVisibleItems.length, nextIndex),
      ];
    });
  };

  const handleScroll = React.useCallback(
    (event: React.UIEvent<HTMLElement>) => {
      const target = event.target as HTMLElement;
      const scrollBottom =
        target.scrollHeight - target.scrollTop - target.clientHeight;
      if (scrollBottom <= 10) {
        handleLoadMore();
      }
    },
    [handleLoadMore]
  );

  return render(visibleItems!, handleScroll);
}

export default LoadMore;
