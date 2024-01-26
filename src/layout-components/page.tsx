import { useEffect, useState } from 'react';
import { NavigationPane } from './NavigationPane';
import { ContentPane } from './ContentPane';
import { InfoPane } from './InfoPane';
import styles from './page.module.sass';

export const Page = () => {


    return (
        <> {
            <div className={styles.page}>
                <aside className={styles.Navigation}>
                    <NavigationPane />
                </aside>
                <main className={styles.mainContent}>
                    <ContentPane />
                    <section className={styles.info}>
                        <InfoPane />
                    </section>
                </main>
            </div>
        } </>
    );
}

