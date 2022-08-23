/// <reference types="react" />
declare type BudgetItemProps = {
    label: string;
    value?: number;
    onChange?: () => void;
};
declare function BudgetItem({ label, value, onChange }: BudgetItemProps): JSX.Element;
export default BudgetItem;
