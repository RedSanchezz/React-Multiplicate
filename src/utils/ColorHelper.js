export default class ColorHelper {

    static hexToRgb(hex) {
        if (hex[0] === "#") hex = hex.slice(1);
        let r = parseInt(hex.slice(0, 2), 16);
        let g = parseInt(hex.slice(2, 4), 16);
        let b = parseInt(hex.slice(4), 16);
        return "rgba(" + r + "," + g + "," + b + ")";
    }
    static hexToRgba(hex, alpha) {
        if (hex[0] === "#") hex = hex.slice(1);
        let r = parseInt(hex.slice(0, 2), 16);
        let g = parseInt(hex.slice(2, 4), 16);
        let b = parseInt(hex.slice(4), 16);
        return "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
    }
    static rgbToHex(rgb) {
        rgb = rgb.replace(/[\s()rgba;]/gi, "").split(",").map((value, index, array) => {
            value = parseInt(value, 10).toString(16);
            if (value.length === 1) value = "0" + value;
            return value;
        }).join("");
        return "#" + rgb;
    }

    static toRgba(str, alpha) {
        if (str.startsWith("rgba")) {
            let hex = ColorHelper.rgbaToHex(str);
            return ColorHelper.hexToRgba(hex, alpha);

        }
        if (str.startsWith("rgb")) {
            let hex = ColorHelper.rgbToHex(str);
            return this.hexToRgba(hex, alpha);
        }
        return this.hexToRgba(str, alpha);
    }

    static rgbaToHex(rgba) {
        rgba = rgba.replace(/[\s()rgba;]/gi, "");
        let result = rgba.split(",").map((value, index, array) => {
            if (index == array.length - 1) return "del";
            value = parseInt(value, 10).toString(16);
            if (value.length === 1) value = "0" + value;
            return value;
        }).filter((value) => { return value !== "del" }).join("");
        return "#" + result;
    }

    static toHex(str) {
        if (str.startsWith("#")) return str;
        if (str.startsWith("rgba")) return ColorHelper.rgbaToHex(str);
        return ColorHelper.rgbToHex(str);
    }
}