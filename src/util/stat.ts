import cdf from "@stdlib/stats-base-dists-hypergeometric-cdf";

/** Chance to draw x or more cards
@param x — input value
@param N — population size
@param K — subpopulation size
@param n — number of draws */
export function hyp(k:number, M:number, n:number, N:number): number {
  return 1 - cdf(k-1, M, n, N)
}
