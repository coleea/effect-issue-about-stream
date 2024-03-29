// import { Chunk, Effect } from "effect"
//  
// export type RawData = string
//  
// export class PageResult {
//   constructor(
//     readonly results: Chunk.Chunk<RawData>,
//     readonly isLast: boolean
//   ) {}
// }
//  
// const pageSize = 20
//  
// export const listPaginated = (
//   pageNumber: number
// ): Effect.Effect<PageResult, Error> => {
//   return Effect.succeed(
//     new PageResult(
//       Chunk.map(
//         Chunk.range(1, pageSize),
//         (index) => `Result ${pageNumber}-${index}`
//       ),
//       pageNumber === 5 // Return 3 pages
//     )
//   )
// }