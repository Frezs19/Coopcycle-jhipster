package polytech.info.gl.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class MagasinMapperTest {

    private MagasinMapper magasinMapper;

    @BeforeEach
    public void setUp() {
        magasinMapper = new MagasinMapperImpl();
    }
}
