import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';

// PrimeNG Imports
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { RatingModule } from 'primeng/rating';
import { AvatarModule } from 'primeng/avatar';
import { TimelineModule } from 'primeng/timeline';
import { StepsModule } from 'primeng/steps';
import { TagModule } from 'primeng/tag';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CardModule,
    CarouselModule,
    RatingModule,
    AvatarModule,
    TimelineModule,
    StepsModule,
    TagModule,
    MenubarModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  currentPhrase = 'saudável';
  phrases = ['saudável', 'consciente', 'equilibrado', 'energizado', 'confiante'];
  phraseIndex = 0;
  phraseInterval: any;

  features = [
    {
      icon: 'pi pi-chart-line',
      title: 'Análise Nutricional Completa',
      description: 'Monitore macros, micros, calorias e todos os nutrientes essenciais para sua saúde em tempo real.'
    },
    {
      icon: 'pi pi-mobile',
      title: 'Scanner Inteligente',
      description: 'Escaneie códigos de barras ou tire fotos dos alimentos para registrar automaticamente as informações nutricionais.'
    },
    {
      icon: 'pi pi-heart',
      title: 'Metas Personalizadas',
      description: 'Defina objetivos específicos baseados no seu perfil, histórico médico e metas de saúde pessoais.'
    },
    {
      icon: 'pi pi-users',
      title: 'Comunidade Ativa',
      description: 'Conecte-se com outros usuários, compartilhe receitas e receba suporte em sua jornada nutricional.'
    },
    {
      icon: 'pi pi-calendar',
      title: 'Planejamento de Refeições',
      description: 'Crie planos alimentares semanais inteligentes que se adaptam às suas preferências e restrições.'
    },
    {
      icon: 'pi pi-shield',
      title: 'Dados Seguros',
      description: 'Seus dados de saúde são protegidos com criptografia de nível hospitalar e total privacidade.'
    }
  ];

  steps = [
    {
      title: 'Crie seu Perfil',
      description: 'Adicione suas informações básicas, objetivos de saúde e preferências alimentares para personalizar sua experiência.'
    },
    {
      title: 'Registre suas Refeições',
      description: 'Use nosso scanner inteligente ou busca por alimentos para registrar o que você come de forma rápida e precisa.'
    },
    {
      title: 'Acompanhe seu Progresso',
      description: 'Visualize relatórios detalhados, conquiste metas e ajuste seu plano conforme seus resultados.'
    }
  ];

  stats = [
    { value: '500K+', label: 'Usuários Ativos' },
    { value: '2M+', label: 'Refeições Registradas' },
    { value: '95%', label: 'Taxa de Sucesso' },
    { value: '4.9', label: 'Avaliação Média' }
  ];

  screenshots = [
    {
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: 'Dashboard Principal',
      description: 'Visão geral completa dos seus dados nutricionais'
    },
    {
      image: 'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: 'Scanner de Alimentos',
      description: 'Tecnologia avançada de reconhecimento'
    },
    {
      image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: 'Relatórios Detalhados',
      description: 'Análises profundas do seu progresso'
    },
    {
      image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: 'Planejador de Refeições',
      description: 'Organize sua semana alimentar'
    }
  ];

  testimonials = [
    {
      name: 'Maria Silva',
      role: 'Nutricionista',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 5,
      comment: 'Revolucionou minha prática profissional. Meus pacientes estão mais engajados e os resultados são impressionantes!'
    },
    {
      name: 'João Santos',
      role: 'Atleta Profissional',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 5,
      comment: 'Finalmente um app que entende as necessidades específicas de um atleta. Perfeito para otimizar performance!'
    },
    {
      name: 'Ana Costa',
      role: 'Mãe de Família',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 5,
      comment: 'Consegui organizar a alimentação de toda família. As crianças agora comem mais saudável e com prazer!'
    }
  ];

  carouselResponsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  ngOnInit() {
    this.startPhraseRotation();
  }

  ngOnDestroy() {
    if (this.phraseInterval) {
      clearInterval(this.phraseInterval);
    }
  }

  startPhraseRotation() {
    this.phraseInterval = setInterval(() => {
      this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
      this.currentPhrase = this.phrases[this.phraseIndex];
    }, 2000);
  }
}

bootstrapApplication(App, {
  providers: [
    importProvidersFrom(BrowserAnimationsModule)
  ]
});