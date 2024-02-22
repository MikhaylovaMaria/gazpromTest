import { ChoiceGroup } from '@consta/uikit/ChoiceGroup';
import styles from './index.module.css';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const ChoiceGroupCurrency = ({ value, onChange }: Props) => (
  <ChoiceGroup
    value={value}
    onChange={({ value }) => onChange(value)}
    items={['$', '€', '¥']}
    getItemLabel={(item) => item}
    view="primary"
    multiple={false}
    name="ChoiceGroupValute"
    size="xs"
    className={styles.choiceGroup}
  />
);

export default ChoiceGroupCurrency;
