export class Any
{
    static number()
    {
        return this.numberBetween(Number.MIN_VALUE, Number.MAX_VALUE);
    }

    static numberBetween(high: number, low: number)
    {
        let result = (Math.random() * (high - low)) + low;
        console.log(result);
        return result;
    }
}