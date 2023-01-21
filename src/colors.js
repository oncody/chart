import {Arrays, Numbers} from "@oncody/objects";

const COLORS = [
    '#f37735',
    '#0e0fed',
    '#14A76C',
    '#00aedb',
    '#B10DC9',
    '#8860D0',
    '#ff1d58',
    // '#fc4a1a',
    // '#ff3377',
    // '#ff5588',
    // '#F012BE',
    // '#f75990',
    // '#FF007f',
];

class Colors {
    constructor() {
        /** @private */ this._allColors = COLORS;
        /** @private */ this._unusedColors = Arrays.clone(COLORS);
    }

    /** @returns {string} */
    nextColor = () => {
        if(!this._unusedColors.length) {
            this._unusedColors = Arrays.clone(this._allColors);
        }

        let color = this._unusedColors[0];
        this._unusedColors.splice(0, 1);
        return color;
    }

    /** @returns {string} */
    randomColor = () => {
        if(!this._unusedColors.length) {
            this._unusedColors = Arrays.clone(this._allColors);
        }

        let index = Numbers.randomIntegerExclusive(0, this._unusedColors.length);
        let color = this._unusedColors[index];
        this._unusedColors.splice(index, 1);
        return color;
    }
}

export {Colors}
