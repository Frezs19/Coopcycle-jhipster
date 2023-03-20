package polytech.info.gl.service.mapper;

import org.mapstruct.*;
import polytech.info.gl.domain.Magasin;
import polytech.info.gl.domain.Produit;
import polytech.info.gl.service.dto.MagasinDTO;
import polytech.info.gl.service.dto.ProduitDTO;

/**
 * Mapper for the entity {@link Produit} and its DTO {@link ProduitDTO}.
 */
@Mapper(componentModel = "spring")
public interface ProduitMapper extends EntityMapper<ProduitDTO, Produit> {
    @Mapping(target = "magasin", source = "magasin", qualifiedByName = "magasinNom")
    ProduitDTO toDto(Produit s);

    @Named("magasinNom")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "nom", source = "nom")
    MagasinDTO toDtoMagasinNom(Magasin magasin);
}
