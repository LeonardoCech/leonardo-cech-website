'use client'

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import useIsMobile from './isMobile';

const Top = React.forwardRef<HTMLDivElement>((_props, ref) => {

  const isMobile = useIsMobile();
  const width = isMobile ? '400px' : '1264px';
  const mobileMult = .75;
  const desktopMult = 1;

  const [isInView, setIsInView] = useState(true); // Assume que está em view inicialmente
  const sectionRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<{ [key: string]: NodeJS.Timeout }>({});
  const [contentVisible, setContentVisible] = useState(false); // Novo estado para controlar a visibilidade do conteúdo

  const skills = [
    'Arquiteto de Software',
    'Engenheiro de API RESTful',
    'Desenvolvedor de Websites',
    'Desenvolvedor de Aplicativos',
    'UI/UX Designer',
  ]

  // Estado para controlar o índice atual do skill
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);

  useEffect(() => {
    const startAnimations = () => {
      // Limpar timers anteriores
      Object.values(timersRef.current).forEach(timer => clearTimeout(timer));

      // // Resetar estados se não estiver em view
      // if (!isInView) {
      //   setContentVisible(false); // Esconde o conteúdo se não estiver em view
      //   return;
      // }

      // Inicia a animação de expansão
      timersRef.current.timerExpand = setTimeout(() => {
        setContentVisible(true); // Torna o conteúdo visível após a expansão
      }, 1000); // Atraso igual à duração da animação de expansão
    };

    startAnimations();

    const timers = timersRef.current;
    return () => {
      // Limpar timers quando o componente é desmontado ou isInView muda
      Object.values(timers).forEach(timer => clearTimeout(timer));
    };
  }, [isInView]);

  useEffect(() => {
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

  // Scroll automático dos itens da lista
  useEffect(() => {
    if (!contentVisible || !isInView) return;
    const interval = setInterval(() => {
      setCurrentSkillIndex((prev) => (prev + 1) % skills.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [contentVisible, isInView, skills.length]);

  // Altura de cada item (ajuste conforme o design)
  const itemHeight = isMobile ? 28 : 40; // px

  return (
    <div
      id='top'
      ref={(node) => {
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
        sectionRef.current = node;
      }}
      className='w-full flex flex-wrap gap-[4rem] justify-evenly items-center'
      style={{
        width,
        marginTop: isMobile ? '3rem' : '10rem',
      }}
    >
      <div
        className={`flex flex-col ${contentVisible ? 'expand-horizontal' : ''}`}
        style={{
          width: isMobile ? '300px' : '500px',
          gap: isMobile ? '1rem' : '2rem',
          fontSize: isMobile ? '1.25rem' : '2rem',
          lineHeight: isMobile ? '1.25rem' : '2rem',
        }}
      >
        <p className={`subtitle ${contentVisible ? 'fade-in' : 'invisible'}`} >
          Olá, eu sou
        </p>

        <h1
          className={`title ${contentVisible ? 'fade-in' : 'invisible'}`}
          style={{
            fontSize: isMobile ? '2.5rem' : '4rem',
            lineHeight: isMobile ? '2.5rem' : '4rem',
          }}
        >
          Leonardo Cech
        </h1>

        {/* Lista com efeito de scroll */}
        {contentVisible && (
          <div
            style={{
              overflow: 'hidden',
              height: `${itemHeight}px`,
              position: 'relative',
            }}
          >
            <ul
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                transition: 'transform 0.5s cubic-bezier(.4,0,.2,1)',
                transform: `translateY(-${currentSkillIndex * itemHeight}px)`,
              }}
            >
              {skills.concat(skills[0]).map((skill, idx) => (
                <li
                  key={idx}
                  style={{
                    height: `${itemHeight}px`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    fontSize: isMobile ? '1.25rem' : '2rem',
                    transition: 'all 0.5s cubic-bezier(.4,0,.2,1)',
                  }}
                  className="subtitle"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className={`w-fit h-fit flex justify-center items-center`} >
        <div
          id='image-container'
          style={{
            width: `calc(358px * ${isMobile ? mobileMult : desktopMult})`,
            height: `calc(358px * ${isMobile ? mobileMult : desktopMult})`,
            position: 'relative',
          }}
        >
          <svg
            className="panel-svg"
            width={`calc(358px * ${isMobile ? mobileMult : desktopMult})`}
            height={`calc(358px * ${isMobile ? mobileMult : desktopMult})`}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 1,
              pointerEvents: 'none',
            }}
          >
            <circle
              className={`panel-circle ${contentVisible ? 'draw-border' : ''}`}
              cx="50%"
              cy="50%"
              r={`${(350 * (isMobile ? mobileMult : desktopMult)) / 2}`}
              fill={contentVisible ? 'rgba(56, 67, 79, .75)' : 'transparent'}
              stroke="#38434F"
              strokeWidth="8"
            />
          </svg>

          <Image
            id='image'
            src='image.png'
            alt='Leonardo Cech'
            width={342 * (isMobile ? mobileMult : desktopMult)}
            height={350 * (isMobile ? mobileMult : desktopMult)}
            style={{
              transform: `translateY(calc(-34px * ${isMobile ? mobileMult : desktopMult})) translateX(calc(8px * ${isMobile ? mobileMult : desktopMult}))`,
            }}
          />
        </div>
      </div>
    </div>
  );
});

Top.displayName = 'Top';

export default Top;