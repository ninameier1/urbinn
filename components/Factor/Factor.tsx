import styles from "./Factor.module.css";

type FactorProps = {
  label?: string;
  type: "plus" | "min";
  text: string;
  fcolour: string;
};

export default function Factor({ type, text, fcolour }: FactorProps) {
  const symbol = type === "plus" ? "+" : "−";

  return (
    <div
      className={`${styles.factorWrapper} ${styles[type]}`}
      style={{ ["--factorColour" as any]: fcolour }}
    >
      <div className={styles.factorTextWrapper}>
        <p className={`${styles.factorType} ${type === 'plus' ? styles.typePlus : styles.typeMin}`}>{symbol}</p>
        <p className={styles.factorText}>{text}</p>
      </div>
    </div>
  );
}