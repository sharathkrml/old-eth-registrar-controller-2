import { BigInt } from "@graphprotocol/graph-ts"
import {
    NameRegistered as NameRegisteredEvent,
    NameRenewed as NameRenewedEvent,
    NewPriceOracle as NewPriceOracleEvent,
    OwnershipTransferred as OwnershipTransferredEvent,
} from "../generated/ETHRegistrarController/ETHRegistrarController"
import {
    Counter,
    OwnershipTransferred,
    NewPriceOracle,
    NameRenewed,
    NameRegistered,
} from "../generated/schema"

export function handleNameRegistered(event: NameRegisteredEvent): void {
    let counter = getCounter("NameRegistered")

    let nameRegistered = new NameRegistered(counter.count.toString())
    nameRegistered.index = counter.count
    nameRegistered.hash = event.transaction.hash

    nameRegistered.name = event.params.name
    nameRegistered.label = event.params.label
    nameRegistered.owner = event.params.owner
    nameRegistered.cost = event.params.cost
    nameRegistered.expires = event.params.expires
    nameRegistered.save()

    counter.save()
}

export function handleNameRenewed(event: NameRenewedEvent): void {
    let counter = getCounter("NameRenewed")

    let nameRenewed = new NameRenewed(counter.count.toString())
    nameRenewed.index = counter.count
    nameRenewed.hash = event.transaction.hash

    nameRenewed.name = event.params.name
    nameRenewed.label = event.params.label
    nameRenewed.cost = event.params.cost
    nameRenewed.expires = event.params.expires
    nameRenewed.save()

    counter.save()
}

export function handleNewPriceOracle(event: NewPriceOracleEvent): void {
    let counter = getCounter("NewPriceOracle")

    let newPriceOracle = new NewPriceOracle(counter.count.toString())
    newPriceOracle.index = counter.count
    newPriceOracle.hash = event.transaction.hash

    newPriceOracle.oracle = event.params.oracle
    newPriceOracle.save()

    counter.save()
}

export function handleOwnershipTransferred(event: OwnershipTransferredEvent): void {
    let counter = getCounter("OwnershipTransferred")

    let ownershipTransferred = new OwnershipTransferred(counter.count.toString())
    ownershipTransferred.index = counter.count
    ownershipTransferred.hash = event.transaction.hash

    ownershipTransferred.previousOwner = event.params.previousOwner
    ownershipTransferred.newOwner = event.params.newOwner
    ownershipTransferred.save()

    counter.save()
}

function getCounter(key: string): Counter {
    let counter = Counter.load(key)
    if (!counter) {
        counter = new Counter(key)
        counter.count = BigInt.fromI32(0)
    }
    counter.count = counter.count.plus(BigInt.fromI32(1))
    return counter
}
