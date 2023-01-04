import { XIcon, InformationCircleIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import cls from 'classnames';

import styles from './styles.module.scss';

type BannerProps = {
  text: {
    sm: string;
    lg: string;
  }
}

export function Banner({ text }: BannerProps) {
  const [isClosed, setIsClosed] = useState(false);

  return (
    <div className={cls(styles.banner_container, { 'hidden': isClosed })}>
      <div>
        <div>
          <div className={styles.banner_info}>
            <span>
              <InformationCircleIcon aria-hidden />
            </span>
            <p>
              <span>{text.sm}</span>
              <span>{text.lg}</span>
            </p>
          </div>
          <div className={styles.banner_close_container}>
            <button
              type="button"
              onClick={() => setIsClosed(true)}
            >
              <span>Fechar</span>
              <XIcon aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
