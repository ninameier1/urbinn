import styles from "./Mechanism.module.css";
import Gear from "@/components/Gear/Gear";

type MechanismProps = {
  text: string;
  mechcolour: string;
  angle: number;
};

export default function Mechanism({ text, mechcolour, angle }: MechanismProps) {
  return (
    <div
      className={styles.mechanismWrapper}
      style={{ ["--angle" as any]: `${angle}deg` }}
    >
      <Gear teeth={8} colour={mechcolour} variant="mechanism" />

      <div className={styles.mechanismText}>
        <p>{text}</p>
      </div>
    </div>
  );
}