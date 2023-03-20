package polytech.info.gl.service.mapper;

import org.mapstruct.*;
import polytech.info.gl.domain.Cooperative;
import polytech.info.gl.service.dto.CooperativeDTO;

/**
 * Mapper for the entity {@link Cooperative} and its DTO {@link CooperativeDTO}.
 */
@Mapper(componentModel = "spring")
public interface CooperativeMapper extends EntityMapper<CooperativeDTO, Cooperative> {}
