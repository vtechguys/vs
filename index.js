export function vs(config) {
    return function variantGen(props) {
        const variantStyles = [];
        if (typeof config.extend === 'function') {
            const extended = config.extend(props);
            spreadAndPush(variantStyles, extended);
        }
        if (config.base) {
            spreadAndPush(variantStyles, config.base);
        }
        if (config.variants) {
            for (const variantKey in config.variants) {
                const variantValue = props[variantKey] || config.defaultVariants?.[variantKey];
                const variantKindTypes = config.variants[variantKey];
                const styles = variantKindTypes[variantValue];
                if (variantValue && styles) {
                    spreadAndPush(variantStyles, styles);
                }
            }
        }
        if (Array.isArray(config.compoundVariants)) {
            for (const compoundVariant of config.compoundVariants) {
                const { variants, styles } = compoundVariant;
                let propsMatchVariants = true;
                for (const variantKey in variants) {
                    const variantValue = variants[variantKey];
                    const propsVariantValue = variants[variantKey];
                    if (variantValue !== propsVariantValue) {
                        propsMatchVariants = false;
                        break;
                    }
                }
                if (propsMatchVariants) {
                    spreadAndPush(variantStyles, styles);
                }
            }
        }
        return variantStyles;
    };
}



function spreadAndPush(array, value) {
    if (array && value) {
        if (Array.isArray(value)) {
            array.push(...value);
        }
        else {
            array.push(value);
        }
    }
}