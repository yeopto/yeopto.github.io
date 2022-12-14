import { MutableRefObject, useRef, useState, useMemo, useEffect } from 'react';
import { PostListItemType } from 'types/PostItem.types';

export type useInfiniteScrollType = {
  containerRef: MutableRefObject<HTMLDivElement | null>;
  postList: PostListItemType[];
};

const NUMBER_OF_ITEMS_PER_PAGE = 10;

const useInfiniteScroll = function (
  selectedCategory: string,
  posts: PostListItemType[],
): useInfiniteScrollType {
  const containerRef: MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);
  const [count, setCount] = useState<number>(1);

  const postListByCategory = useMemo<PostListItemType[]>(
    () =>
      posts.filter(
        ({
          node: {
            frontmatter: { categories },
          },
        }: PostListItemType) =>
          selectedCategory !== 'All'
            ? categories.includes(selectedCategory)
            : true,
      ),
    [selectedCategory],
  );

  if (typeof window !== 'undefined') {
    const observer: IntersectionObserver = new IntersectionObserver(
      (entries, observer) => {
        if (!entries[0].isIntersecting) return;

        setCount(value => value + 1);
        observer.disconnect();
      },
    );

    useEffect(() => {
      if (
        NUMBER_OF_ITEMS_PER_PAGE * count >= postListByCategory.length ||
        containerRef.current === null ||
        containerRef.current.children.length === 0
      )
        return;

      observer.observe(
        containerRef.current.children[containerRef.current.children.length - 1],
      );
    }, [count, selectedCategory]);
  }

  useEffect(() => setCount(1), [selectedCategory]);

  return {
    containerRef,
    postList: postListByCategory.slice(0, count * NUMBER_OF_ITEMS_PER_PAGE),
  };
};

export default useInfiniteScroll;
