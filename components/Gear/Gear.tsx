import styles from "./Gear.module.css";

type GearProps = {
  teeth: number;
  colour: string;
  variant: string;
  active?: boolean;
};

export default function Gear({ teeth, colour, variant, active }: GearProps) {
  return (
    <div
      className={`${styles.gear} ${styles[`gear--${variant}`]} ${active ? styles.active : "" }`} 
      style={{
        ["--teeth" as any]: teeth,
        ["--gear-colour" as any]: colour,
      }}
    >
      {[...Array(teeth)].map((_, i) => (
        <span key={i} style={{ ["--i" as any]: i + 1 }} />
      ))}
    </div>
  );
}