import { Chunk, Effect, Stream, Option } from "effect";

export type RawData = string;
export class PageResult {
  constructor(
    readonly results: Chunk.Chunk<RawData>,
    readonly isLast: boolean
  ) {}
}

const PAGE_SIZE = 3;
const LAST_PAGE = 5;
const INITIAL_PAGE = LAST_PAGE + 1;

const finalAttempt: Stream.Stream<RawData, Error> = Stream.paginateChunkEffect(
  INITIAL_PAGE,
  (pageNumber) => {
    console.log("[callback loop count] ", pageNumber);

    const pageResult = new PageResult(
      Chunk.map(
        Chunk.range(1, PAGE_SIZE),
        (index) => `Result ${pageNumber}-${index}`
      ),
      pageNumber === pageNumber + 1 // THIS LINE IS THE CAUSE OF PROBLEM
    );

    return Effect.succeed(pageResult).pipe(
      Effect.map((page) => {
        return [
          page.results,
          page.isLast ? Option.none<number>() : Option.some(pageNumber + 1),
        ];
      })
    );
  }
);

Effect.runPromise(Stream.runCollect(finalAttempt)).then(console.log);
