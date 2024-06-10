Math.min = function <B extends number | bigint>(this: string, ...values: B[]): B {
    if (values.length < 1) {
        return Infinity as any;
    }

    let minValue = values.shift()!;

    for (const value of values) {
        if (value < minValue) {
            minValue = value;
        }
    }

    return minValue;
};

Math.max = function <B extends number | bigint>(this: string, ...values: B[]): B {
    if (values.length < 1) {
        return -Infinity as any;
    }

    let maxValue = values.shift()!;

    for (const value of values) {
        if (value > maxValue) {
            maxValue = value;
        }
    }

    return maxValue;
};

export {};
