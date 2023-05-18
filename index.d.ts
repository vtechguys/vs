type GenericObject = Record<string, any>;
type StyleBaseValue = string | GenericObject;
type StyleValue = StyleBaseValue | StyleBaseValue[];
type VariantConfig = Record<string, Record<string, StyleValue>>;
type VariantStyles<T extends VariantConfig> = Array<StyleValue>;
type VariantProps<T extends VariantConfig> = {
  [K in keyof T]?: keyof T[K] | undefined;
};
type CompoundVariant<T extends VariantConfig> = {
  variants: VariantProps<T>;
  styles: StyleValue;
};
type Config<T extends VariantConfig> = {
  base?: StyleValue;
  variants?: T;
  defaultVariants?: VariantProps<T>;
  compoundVariants?: Array<CompoundVariant<T>>;
  extend?: (props: VariantProps<T>) => VariantStyles<T>;
};
export declare function vs<T extends VariantConfig>(
  config: Config<T>
): (props: VariantProps<T>) => VariantStyles<T>;
type NoOpFn = (...args: any[]) => any;
export type GetVariantProps<T extends NoOpFn> = Parameters<T>[0];
export {};
