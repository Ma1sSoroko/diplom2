export function useTotalPrice(count: number, price: string): number {
    const totalPrice = count * Number(price.slice(1, 10))

    return totalPrice
}