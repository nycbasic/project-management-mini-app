export function duplicateShimmer(num) {
    let count = 0;
    const arr = [];
    while (num > count) {
        arr.push('div');
        count++;
    }
    return arr;
};