import { getRounds, hashSync } from "bcryptjs"
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity("users")
class User {

    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({length: 45})
    name: string

    @Column({length: 45, unique: true})
    email: string

    @Column({ type: "boolean", default: false})
    admin: boolean

    @Column({length: 120, })
    password: string

    @CreateDateColumn({ type: "date"})
    createdAt: string | Date

    @UpdateDateColumn({ type: "date"})
    updatedAt: string | Date

    @DeleteDateColumn({ type: "date"})
    deletedAt: string | Date

    @BeforeInsert()
    @BeforeUpdate()
    hashpassword() {
        const isEncrypted = getRounds(this.password)
        if (!isEncrypted) {
            this.password = hashSync(this.password, 10)
        }
    }
}

@Entity("categories")
class Category {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({length: 45, unique: true})
    name: string
}

@Entity("addresses")
class Address {

    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({ length: 45 })
    street: string

    @Column({ length: 8 })
    zipCode: string

    @Column({ type: "varchar", length: 7, nullable: true })
    number?: string | null | undefined

    @Column({ length: 20 })
    city: string

    @Column({ length: 2 })
    state: string
}

@Entity("real_state")
class RealEstate {

    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({ type: "boolean", default: false })
    sold: boolean | undefined

    @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
    value: number | string

    @Column({ type: "integer" })
    size: number

    @CreateDateColumn({ type: "date"})
    createdAt: string

    @UpdateDateColumn({ type: "date"})
    updatedAt: string

    @OneToOne(() => Address)
    @JoinColumn()
    address: Address

    @ManyToOne(() => Category)
    @JoinColumn()
    category: Category

    @OneToMany(() => Schedule, (schedule) => schedule.realEstate)
    schedules: Schedule[]
}

@Entity("schedules_users_properties")
class Schedule {

    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({type: "date"})
    date: string | Date

    @Column({ type:"time", })
    hour: Date | string

    @ManyToOne(() => RealEstate)
    @JoinColumn()
    realEstate: RealEstate

    @ManyToOne(() => User)
    @JoinColumn()
    user: User
}

export {
    User,
    Category,
    Address,
    RealEstate,
    Schedule
}