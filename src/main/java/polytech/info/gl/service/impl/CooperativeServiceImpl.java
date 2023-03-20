package polytech.info.gl.service.impl;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import polytech.info.gl.domain.Cooperative;
import polytech.info.gl.repository.CooperativeRepository;
import polytech.info.gl.service.CooperativeService;
import polytech.info.gl.service.dto.CooperativeDTO;
import polytech.info.gl.service.mapper.CooperativeMapper;

/**
 * Service Implementation for managing {@link Cooperative}.
 */
@Service
@Transactional
public class CooperativeServiceImpl implements CooperativeService {

    private final Logger log = LoggerFactory.getLogger(CooperativeServiceImpl.class);

    private final CooperativeRepository cooperativeRepository;

    private final CooperativeMapper cooperativeMapper;

    public CooperativeServiceImpl(CooperativeRepository cooperativeRepository, CooperativeMapper cooperativeMapper) {
        this.cooperativeRepository = cooperativeRepository;
        this.cooperativeMapper = cooperativeMapper;
    }

    @Override
    public CooperativeDTO save(CooperativeDTO cooperativeDTO) {
        log.debug("Request to save Cooperative : {}", cooperativeDTO);
        Cooperative cooperative = cooperativeMapper.toEntity(cooperativeDTO);
        cooperative = cooperativeRepository.save(cooperative);
        return cooperativeMapper.toDto(cooperative);
    }

    @Override
    public CooperativeDTO update(CooperativeDTO cooperativeDTO) {
        log.debug("Request to update Cooperative : {}", cooperativeDTO);
        Cooperative cooperative = cooperativeMapper.toEntity(cooperativeDTO);
        cooperative = cooperativeRepository.save(cooperative);
        return cooperativeMapper.toDto(cooperative);
    }

    @Override
    public Optional<CooperativeDTO> partialUpdate(CooperativeDTO cooperativeDTO) {
        log.debug("Request to partially update Cooperative : {}", cooperativeDTO);

        return cooperativeRepository
            .findById(cooperativeDTO.getId())
            .map(existingCooperative -> {
                cooperativeMapper.partialUpdate(existingCooperative, cooperativeDTO);

                return existingCooperative;
            })
            .map(cooperativeRepository::save)
            .map(cooperativeMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CooperativeDTO> findAll() {
        log.debug("Request to get all Cooperatives");
        return cooperativeRepository.findAll().stream().map(cooperativeMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<CooperativeDTO> findOne(Long id) {
        log.debug("Request to get Cooperative : {}", id);
        return cooperativeRepository.findById(id).map(cooperativeMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Cooperative : {}", id);
        cooperativeRepository.deleteById(id);
    }
}
