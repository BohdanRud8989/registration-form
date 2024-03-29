import styles from "./centeredLayout.module.css"

export default function CenteredLayout({ className, children, ...props }) {
  return (
    <section className={styles.centeredLayout} {...props}>
      {children}
    </section>
  );
}
