"use client";

import Image from "next/image";
import { useState } from "react";
import { formatLabels, type ProductRecord } from "@/types/catalog";
import { ProductSwitcher } from "@/components/catalog-concept/product-switcher";
import styles from "@/app/catalog-concept/catalog-concept.module.css";

type ProductStageProps = {
  products: ProductRecord[];
};

export function ProductStage({ products }: ProductStageProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProduct = products[activeIndex];

  if (!activeProduct?.asset) return null;

  const isWarmScene = activeIndex % 2 === 0;
  const sceneClass = isWarmScene ? styles.sceneWarm : styles.sceneDark;
  const tiltClass = isWarmScene ? styles.tiltLeft : styles.tiltRight;
  const asset = activeProduct.asset;

  return (
    <div className={`${styles.scene} ${sceneClass}`.trim()}>
      <div aria-hidden="true" className={styles.panels}>
        {Array.from({ length: 7 }, (_, index) => (
          <span key={index} />
        ))}
      </div>

      <div className={styles.stage}>
        <div aria-hidden="true" className={styles.podium} />
        <div className={`${styles.bottleWrap} ${tiltClass}`.trim()}>
          <div className={styles.bottleAnimate} key={activeProduct.id}>
            <Image
              alt={asset.alt}
              className={styles.bottleImg}
              height={asset.height}
              priority={activeIndex === 0}
              sizes="(max-width: 1023px) 60vw, 26vw"
              src={asset.src}
              unoptimized
              width={asset.width}
            />
          </div>
        </div>

        <dl aria-live="polite" className={styles.metadata}>
          <div>
            <dt>Продукт</dt>
            <dd>
              {activeProduct.name} · {activeProduct.flavor}
            </dd>
          </div>
          {activeProduct.volume ? (
            <div>
              <dt>Объём</dt>
              <dd>{activeProduct.volume}</dd>
            </div>
          ) : null}
          {activeProduct.format ? (
            <div>
              <dt>Формат</dt>
              <dd>{formatLabels[activeProduct.format]}</dd>
            </div>
          ) : null}
          {activeProduct.alcoholClassification ? (
            <div>
              <dt>Классификация</dt>
              <dd>{activeProduct.alcoholClassification}</dd>
            </div>
          ) : null}
        </dl>
      </div>

      <ProductSwitcher
        activeIndex={activeIndex}
        onSelect={setActiveIndex}
        products={products}
      />
    </div>
  );
}
