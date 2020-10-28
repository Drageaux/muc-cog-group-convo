/** @type {Map<number, Array<HTMLElement>>} */
const STACKS = new Map([[0, []], [1, []]]);
const MAX_HEIGHT = 0.25;
const MAX_CHARACTER_COUNT = 40;

AFRAME.registerComponent('update-stacks', {
    schema: { stackId: { type: 'number' } },
    init: function () {
        console.log('beep beep lettuce.');
    }
})

AFRAME.registerComponent('begin-socket', {
    init: function () {
        let i = 0;
        setInterval(() => {
            const STACK_ID = 0;
            const newTextElement = createAFrameText(`${i}: Message is really interesting wow so interesting`, [1.0, 2.5, -1.290], [0, 90, 0]);
            this.el.appendChild(newTextElement);
            newTextElement.addEventListener('loaded', () => {
                const stack = STACKS.get(STACK_ID);
                if (!stack) {
                    throw new Error("Provided invalid stack ID.");
                }
                for (const element of stack) {
                    const { y } = element.getAttribute('position');
                    const newY = y + MAX_HEIGHT;
                    element.object3D.position.y = y + MAX_HEIGHT + 0.025;
                }
                stack.push(newTextElement);
                setTimeout(() => {
                    newTextElement.parentElement.removeChild(newTextElement)
                }, 9000);
            })
            i += 1;
        }, 3000)

        let j = 0;
        setInterval(() => {
            const STACK_ID = 1;
            const newTextElement = createAFrameText(`${j}: Message is really interesting wow so interesting`, [1.0, 2.5, 1.290], [0, 90, 0]);
            this.el.appendChild(newTextElement);
            newTextElement.addEventListener('loaded', () => {
                const stack = STACKS.get(STACK_ID);
                if (!stack) {
                    throw new Error("Provided invalid stack ID.");
                }
                for (const element of stack) {
                    const { y } = element.getAttribute('position');
                    const newY = y + MAX_HEIGHT;
                    element.object3D.position.y = y + MAX_HEIGHT + 0.025;
                }
                stack.push(newTextElement);
                setTimeout(() => {
                    newTextElement.parentElement.removeChild(newTextElement)
                }, 5000);
            })
            j += 1;
        }, 1000)
    }
})

/**
 * 
 * @param {string} text The text to display
 * @param {[number, number, number]} position The (x, y, z) position at which to display the text element
 * @param {[number, number, number]} rotation The rotation of the text element (in degrees)
 */
const createAFrameText = (text, position, rotation) => {
    const newTextElement = document.createElement("a-entity");
    newTextElement.setAttribute('text', {
        wrapCount: MAX_CHARACTER_COUNT,
        value: text,
    });

    newTextElement.setAttribute("geometry", {
        primitive: 'plane',
        width: 1.5,
        height: MAX_HEIGHT,
    });
    newTextElement.setAttribute('material', {
        color: 'black',
        opacity: 0.5,
        side: 'double'
    });
    const [x, y, z] = position;
    const [xDegrees, yDegrees, zDegrees] = rotation;
    newTextElement.setAttribute('position', {
        x, y, z
    })
    newTextElement.setAttribute('rotation', {
        x: xDegrees,
        y: yDegrees,
        z: zDegrees
    });

    return newTextElement;
}
