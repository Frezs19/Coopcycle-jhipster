package polytech.info.gl.service.mapper;

import org.mapstruct.*;
import polytech.info.gl.domain.Cooperative;
import polytech.info.gl.domain.Magasin;
import polytech.info.gl.service.dto.CooperativeDTO;
import polytech.info.gl.service.dto.MagasinDTO;

/**
 * Mapper for the entity {@link Magasin} and its DTO {@link MagasinDTO}.
 */
@Mapper(componentModel = "spring")
public interface MagasinMapper extends EntityMapper<MagasinDTO, Magasin> {
    @Mapping(target = "cooperative", source = "cooperative", qualifiedByName = "cooperativeNom")
    MagasinDTO toDto(Magasin s);

    @Named("cooperativeNom")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "nom", source = "nom")
    CooperativeDTO toDtoCooperativeNom(Cooperative cooperative);
}
