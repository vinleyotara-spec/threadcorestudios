import { ServiceCard, type ServiceCardData } from "@/components/services/ServiceCard";
import type { Service, ServiceCategory } from "@/types";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";

/** Converts a service (a product line) into card data. */
export function serviceToCard(service: Service): ServiceCardData {
  return {
    key: service.id,
    name: service.name,
    description: service.description,
    image: service.image,
    status: service.status,
    href: `/services/${service.slug}`,
    quoteHref: `/quote?service=${service.slug}`,
    whatsappHref: whatsappUrl(whatsappMessages.service(service.name)),
  };
}

/** Converts a category (a group of services) into card data. */
export function categoryToCard(category: ServiceCategory): ServiceCardData {
  return {
    key: category.id,
    name: category.name,
    description: category.description,
    image: category.image,
    status: category.status,
    href: `/services#${category.slug}`,
    quoteHref: `/quote?category=${category.slug}`,
    whatsappHref: whatsappUrl(whatsappMessages.service(category.name)),
  };
}

export function ServiceGrid({
  cards,
  columns = 3,
}: {
  cards: ServiceCardData[];
  columns?: 2 | 3;
}) {
  return (
    <ul
      className={
        columns === 3
          ? "grid gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6"
          : "grid gap-5 sm:grid-cols-2 sm:gap-6"
      }
    >
      {cards.map((card) => (
        <li key={card.key}>
          <ServiceCard card={card} />
        </li>
      ))}
    </ul>
  );
}
