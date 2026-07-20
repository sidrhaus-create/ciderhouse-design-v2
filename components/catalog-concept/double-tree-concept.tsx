import { getFamilyBySlug } from "@/data/catalog-content";
import { ProductStage } from "@/components/catalog-concept/product-stage";
import styles from "@/app/catalog-concept/catalog-concept.module.css";

export function DoubleTreeConcept() {
  const family = getFamilyBySlug("double-tree");
  if (!family) return null;

  const approvedProducts = family.products.filter(
    (product) => product.approvalStatus === "approved" && product.asset,
  );

  if (approvedProducts.length === 0) return null;

  return (
    <section aria-labelledby="catalog-concept-title" className={styles.section}>
      <div className={styles.layout}>
        <div className={styles.editorial}>
          <p className={styles.kicker}>Сидр · Double Tree</p>
          <h1 className={styles.heading} id="catalog-concept-title">
            <span>Европейская классика.</span>
            <span>Яркий характер.</span>
          </h1>
          <p className={styles.body}>{family.description}</p>
          <p className={styles.note}>
            Экспериментальный визуальный прототип каталога. Показаны только
            одобренные продукты Double Tree; выбор продукта переключает
            изображение бутылки, метаданные и тон сцены.
          </p>
        </div>
        <ProductStage products={approvedProducts} />
      </div>
    </section>
  );
}
