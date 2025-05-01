'use client'

import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import useIsMobile from '@/components/isMobile';

const LINK_COUNT = 6;

const Contact = React.forwardRef<HTMLDivElement>((_props, ref) => {

  const [isInView, setIsInView] = useState(true); // Assume que está em view inicialmente
  const [animated, setAnimated] = useState(Array(LINK_COUNT).fill(false));
  const sectionRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<{ [key: string]: NodeJS.Timeout }>({});

  const isMobile = useIsMobile();

  useEffect(() => {
    if (isInView) {
      // Limpa animações anteriores
      setAnimated(Array(LINK_COUNT).fill(false));
      // Espera 2 segundos antes de iniciar animação sequencial
      timersRef.current['delay'] = setTimeout(() => {
        for (let i = 0; i < LINK_COUNT; i++) {
          timersRef.current[`link${i}`] = setTimeout(() => {
            setAnimated(prev => {
              const next = [...prev];
              next[i] = true;
              return next;
            });
          }, i * 200);
        }
      }, 2000);
    } else {
      setAnimated(Array(LINK_COUNT).fill(false));
    }
    // Limpeza dos timeouts já está no outro useEffect
  }, [isInView]);

  useEffect(() => {
    // Configurar o Intersection Observer para detectar quando o usuário passa pela seção
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;

      // Atualiza o estado baseado na visibilidade da seção
      setIsInView(entry.isIntersecting);
    }, {
      threshold: 0.5, // Trigger quando 50% da seção estiver visível (ajuste conforme necessário)
      rootMargin: '0px'
    });

    // Observar a seção
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      // Desconectar o observer
      observer.disconnect();
    };
  }, []);

  return (
    <div
      id='contact'
      ref={(node) => {
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
        sectionRef.current = node;
      }}
      className='h-fit flex justify-center items-center p-[1rem] gap-[1rem]'
      style={{
        width: isMobile ? 'unset' : '100%'
      }}
    >
      {[
        {
          href: 'Leonardo-Cech-Resume.pdf',
          download: true,
          src: 'cv.svg',
          alt: 'Baixar currículo',
        },
        {
          href: 'mailto:hello@leonardocech.dev',
          target: '_blank',
          src: 'mail.svg',
          alt: 'Contato pelo e-mail',
        },
        {
          href: 'https://linkedin.com/in/leonardocech',
          target: '_blank',
          src: 'linkedin.svg',
          alt: 'Baixar portfólio',
        },
        {
          href: 'https://wa.me/message/2ZKET77TUSOIF1',
          target: '_blank',
          src: 'whatsapp.svg',
          alt: 'Contato pelo WhatsApp',
        },
        {
          href: 'https://t.me/LeonardoCech',
          target: '_blank',
          src: 'telegram.svg',
          alt: 'Contato pelo Telegram',
        },
        {
          href: 'https://github.com/LeonardoCech',
          target: '_blank',
          src: 'github.svg',
          alt: 'Perfil do GitHub',
        },
      ].map((link, i) => (
        <a
          key={link.href}
          href={link.href}
          {...(link.download ? { download: true } : {})}
          {...(link.target ? { target: link.target } : {})}
          className={`link-button${animated[i] ? ' link-slide-up-in' : ''}`}
        >
          <Image
            src={link.src}
            alt={link.alt}
            width={28}
            height={28}
          />
        </a>
      ))}
    </div>);
});

Contact.displayName = 'Contact';

export default Contact;