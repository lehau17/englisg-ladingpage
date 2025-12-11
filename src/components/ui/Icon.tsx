'use client';

import {
    Clock,
    Calendar,
    CalendarDays,
    Users,
    UserCheck,
    GraduationCap,
    Info,
    CreditCard,
    Send,
    MessageCircle,
    Star,
    Handshake,
    Trophy,
    Globe,
    ScrollText,
    Medal,
    Gift,
    Check,
    Target,
    MessageSquare,
    Smartphone,
    Gamepad2,
    Phone,
    Mail,
    MapPin,
    type LucideProps,
} from 'lucide-react';
import { ComponentType } from 'react';

const iconMap: Record<string, ComponentType<LucideProps>> = {
    clock: Clock,
    calendar: Calendar,
    'calendar-days': CalendarDays,
    users: Users,
    'user-check': UserCheck,
    'graduation-cap': GraduationCap,
    info: Info,
    'credit-card': CreditCard,
    send: Send,
    'message-circle': MessageCircle,
    star: Star,
    handshake: Handshake,
    trophy: Trophy,
    globe: Globe,
    'scroll-text': ScrollText,
    medal: Medal,
    gift: Gift,
    check: Check,
    target: Target,
    'message-square': MessageSquare,
    smartphone: Smartphone,
    gamepad: Gamepad2,
    phone: Phone,
    mail: Mail,
    'map-pin': MapPin,
};

export interface IconProps extends LucideProps {
    name: string;
}

export function Icon({ name, className, ...props }: IconProps) {
    const IconComponent = iconMap[name.toLowerCase()];
    if (!IconComponent) {
        console.warn(`Icon "${name}" not found in iconMap`);
        return null;
    }
    return <IconComponent className={className} {...props} />;
}

export default Icon;
