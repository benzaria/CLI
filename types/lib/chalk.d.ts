import chalk from "chalk";
export default chalk;

declare module 'chalk' {
    interface ChalkInstance {
        /**
         * Moves the cursor up by the specified number of lines.
         * @param {number} [lines] The number of lines to move up.
         * @param {string} [replace] The string to be replaced with.
         * @return {this} The current Chalk instance for chaining.
         */
        upline(lines?: number, replace?: string): this;

        /**
         * Moves the cursor down by the specified number of lines.
         * @param {number} [lines] The number of lines to move down.
         * @param {string} [replace] The string to be replaced with.
         * @return {this} The current Chalk instance for chaining.
        */
        dnline(lines?: number, replace?: string): this;

        /**
         * Moves the cursor to the specified position if x and y are provided.
         * else, Returns the current cursor position.
         * @param {number} [x] The column position.
         * @param {number} [y] The row position.
         * @param {string} [replace] The string to be replaced with.
         * @return {this| Promise<{ x: number, y: number }>} The current Chalk instance for chaining.
         */
        XY(x?: number, y?: number, replace?: string): this | Promise<{ x: number, y: number }>;

        /**
         * Moves the cursor to the specified position relative to it's current position.
         * @param {number} x The column position.
         * @param {number} y The row position.
         * @param {string} [replace] The string to be replaced with.
         * @return {this} The current Chalk instance for chaining.
         */
        move(x: number, y: number, replace?: string): this;
    }
}
