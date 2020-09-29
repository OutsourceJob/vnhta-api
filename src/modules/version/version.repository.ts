import { EntityRepository, Repository } from 'typeorm';
import { VersionEntity } from './version.entity';

@EntityRepository(VersionEntity)
export class VersionRepository extends Repository<VersionEntity> { }